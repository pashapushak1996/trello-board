const { List, Card } = require('../model');
const { statusCodesEnum } = require('../configs');

module.exports = {
    getAllLists: async (req, res, next) => {
        try {
            const lists = await List
                .find()
                .populate('cards');

            res
                .status(statusCodesEnum.OK)
                .json(lists);
        } catch (e) {
            next(e);
        }
    },
    createList: async (req, res, next) => {
        try {
            const createdList = await List.create(req.body);

            res
                .status(statusCodesEnum.CREATED)
                .json(createdList);
        } catch (e) {
            next(e);
        }
    },
    deleteList: async (req, res, next) => {
        try {
            const { listId } = req.params;

            const foundList = await List.findById(listId);

            // It deletes all cards which contains list
            const listCardsPromises = foundList.cards.map((cardId) => Card.findByIdAndDelete(cardId));

            await Promise.all(listCardsPromises);

            await List.deleteOne({ _id: listId });

            res
                .status(statusCodesEnum.NO_CONTENT);
        } catch (e) {
            next(e);
        }
    },
    updateList: async (req, res, next) => {
        try {
            const { listId } = req.params;
            const { title } = req.body;

            const updatedList = await List.findOneAndUpdate(
                { _id: listId },
                { $set: { title } }
            );

            res
                .status(statusCodesEnum.OK)
                .json(updatedList);
        } catch (e) {
            next(e);
        }
    },
};
