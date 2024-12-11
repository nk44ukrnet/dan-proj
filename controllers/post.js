const Post = require("../models/Post");
const queryCreator = require("../commonHelpers/queryCreator");
const filterParser = require("../commonHelpers/filterParser");
const _ = require("lodash");

exports.createPost = (req, res, next) => {
    const postData = _.cloneDeep(req.body);
    postData.user = req.user.id;

    // Set likes to 0 if not provided
    if (postData.likes === undefined) {
        postData.likes = [];
    }

    const newPost = new Post(queryCreator(postData));

    newPost.populate("user", "firstName lastName email avatarUrl").execPopulate();

    newPost
        .save()
        .then((post) => res.json(post))
        .catch((err) =>
            res.status(400).json({
                message: `Error happened on server: "${err}" `,
            }),
        );
};

exports.updatePost = (req, res, next) => {
    Post.findOne({ _id: req.params.id })
        .then((post) => {
            if (!post) {
                return res.status(404).json({
                    message: `Post with id "${req.params.id}" is not found.`,
                });
            }

            if (!(req.user.isAdmin || req.user.id === post.user.toString())) {
                return res.status(403).json({
                    message: `You don't have permission to perform this action.`,
                });
            }

            const postData = _.cloneDeep(req.body);

            // Check if imageUrls is empty and set it to null if so
            if (Array.isArray(postData.imageUrls) && postData.imageUrls.length === 0) {
                postData.imageUrls = [];  // Set to null to clear the field
            }

            // Update the post with the new data (including cleared imageUrls if necessary)
            Post.findOneAndUpdate(
                { _id: req.params.id },
                { $set: postData }, // Update with new post data (content & imageUrls)
                { new: true },
            )
                .populate("user", "firstName lastName email avatarUrl")
                .then((post) => res.json(post))
                .catch((err) =>
                    res.status(400).json({
                        message: `Error happened on server: "${err}" `,
                    }),
                );
        })
        .catch((err) =>
            res.status(400).json({
                message: `Error happened on server: "${err}" `,
            }),
        );
};

/*exports.updatePostLikes = (req, res, next) => {
    Post.findOne({ _id: req.params.id })
        .then((post) => {
            if (!post) {
                return res.status(404).json({
                    message: `Post with id "${req.params.id}" is not found.`,
                });
            }

            const updatedPost = queryCreator({ likes: req.body.likes });

            Post.findOneAndUpdate(
                { _id: req.params.id },
                { $set: updatedPost },
                { new: true },
            )
                .populate("user", "firstName lastName email avatarUrl")
                .then((post) => res.json(post))
                .catch((err) =>
                    res.status(400).json({
                        message: `Error happened on server: "${err}" `,
                    }),
                );
        })
        .catch((err) =>
            res.status(400).json({
                message: `Error happened on server: "${err}" `,
            }),
        );
};*/
exports.updatePostLikes = (req, res, next) => {
    const userId = req.user.id;  // Get the current user's ID

    Post.findOne({ _id: req.params.id })
        .then((post) => {
            if (!post) {
                return res.status(404).json({
                    message: `Post with id "${req.params.id}" is not found.`,
                });
            }

            // Get the likes array or initialize an empty one if undefined
            const likes = post.likes || [];

            // Check if the user has already liked the post
            const likeIndex = likes.indexOf(userId);

            if (likeIndex > -1) {
                // If the user has already liked the post, remove their ID from the array
                likes.splice(likeIndex, 1);
            } else {
                // If the user hasn't liked the post yet, add their ID to the array
                likes.push(userId);
            }

            // Update the post with the new likes array
            post.likes = likes;

            // Save the updated post
            post.save()
                .then((updatedPost) => {
                    res.json(updatedPost); // Return the updated post
                })
                .catch((err) =>
                    res.status(400).json({
                        message: `Error saving post: "${err}"`,
                    }),
                );
        })
        .catch((err) =>
            res.status(400).json({
                message: `Error finding post: "${err}"`,
            }),
        );
};

exports.deletePost = (req, res, next) => {
    Post.findOne({ _id: req.params.id })
        .then((post) => {
            if (!post) {
                return res.status(404).json({
                    message: `Post with id "${req.params.id}" is not found.`,
                });
            }

            // Allow admins or the author of the post to delete
            const isAuthorized =
                req.user.isAdmin || req.user.id === post.user.toString();
            if (!isAuthorized) {
                return res.status(403).json({
                    message: `You don't have permission to perform this action.`,
                });
            }

            // Delete the post
            Post.deleteOne({ _id: req.params.id })
                .then(() =>
                    res.status(200).json({
                        message: `Post is successfully deleted from DB`,
                    }),
                )
                .catch((err) =>
                    res.status(400).json({
                        message: `Error happened on server: "${err}" `,
                    }),
                );
        })
        .catch((err) =>
            res.status(400).json({
                message: `Error happened on server: "${err}"`,
            }),
        );
};

exports.getPostById = (req, res, next) => {
    Post.findOne({ _id: req.params.id })
        .populate("user", "firstName lastName email avatarUrl")
        .then((post) => {
            if (!post) {
                return res.status(404).json({
                    message: `Post with id "${req.params.id}" is not found.`,
                });
            } else {
                res.json(post);
            }
        })
        .catch((err) =>
            res.status(400).json({
                message: `Error happened on server: "${err}" `,
            }),
        );
};


exports.getPostsFilterParams = async (req, res, next) => {
    const mongooseQuery = filterParser(req.query);
    const perPage = Number(req.query.perPage) || 10;
    const startPage = Number(req.query.startPage) || 1;
    const sort = req.query.sort || "-date";

    try {
        const posts = await Post.find(mongooseQuery)
            .skip(startPage * perPage - perPage)
            .limit(perPage)
            .populate('user', 'firstName')
            .sort(sort);


        const postsQuantity = await Post.find(mongooseQuery);

        res.json({ posts, postsQuantity: postsQuantity.length });
    } catch (err) {
        res.status(400).json({
            message: `Error happened on server: "${err}" `,
        });
    }
};

