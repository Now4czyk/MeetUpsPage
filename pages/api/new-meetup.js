import { MongoClient } from 'mongodb';

async function handler(req, res) {
	if (req.method === 'POST') {
		const data = req.body;
		const client = await MongoClient.connect(
			'mongodb+srv://Now4czyk:Kacpern30@cluster0.h0u5c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
		);
		const db = client.db();

		const meetupsCollection = db.collection('meetupsA');
		const result = await meetupsCollection.insertOne(data);

		console.log(result);

		client.close();

		res.status(201).json({ message: 'Meetup inserted!' });
	}
}

export default handler;
