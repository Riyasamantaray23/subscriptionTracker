import express from 'express';

const subscriptionRouter = express.Router();

subscriptionRouter.get('/', (req, res) => {
    res.send('Get all subscription');
});

subscriptionRouter.get('/:id', (req, res) => {
    res.send('Get subscription details');
});

subscriptionRouter.post('/', (req, res) => {
    res.send('Create subscription');
});

subscriptionRouter.put('/:id', (req, res) => {
    res.send('Update subscription');
});

subscriptionRouter.delete('/:id', (req, res) => {
    res.send('Delete subscription');
});

subscriptionRouter.get('/user/:id', (req, res) => {
    res.send('Get all user subscription');
});

subscriptionRouter.put('/:id/cancel', (req, res) => {
    res.send('Cancel subscription');
});

subscriptionRouter.get('/:id/upcoming-renewals', (req, res) => {
    res.send('Get upcoming renewals');
});

export default subscriptionRouter;
