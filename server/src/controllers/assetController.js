import Asset from '../models/Asset.js';

const createAsset = async (req, res) => {
    const { name, amount, description } = req.body;

    try {
        const asset = await Asset.create({
            user: req.user._id,
            name,
            amount,
            description,
        });

        res.status(201).json(asset);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAssets = async (req, res) => {
    try {
        const assets = await Asset.find({ user: req.user._id });

        res.json(assets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteAsset = async (req, res) => {
    try {
        await Asset.findByIdAndDelete(req.params.id);

        res.json({ message: 'Asset deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { createAsset, getAssets, deleteAsset };