import { MongoClient } from 'mongodb';
import { Fragment } from 'react';
import MeetupList from '../components/meetups/MeetupList';
import Head from 'next/head';

const HomePage = (props) => {
	return (
		<Fragment>
			<Head>
				<title>React Meetups</title>
				<meta
					name='description'
					content='Browse a huge list of highly active React meetups'></meta>
			</Head>
			<MeetupList meetups={props.meetups} />
		</Fragment>
	);
};

export async function getStaticProps() {
	const client = await MongoClient.connect(
		'mongodb+srv://Now4czyk:Kacpern30@cluster0.h0u5c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
	);
	const db = client.db();

	const meetupsCollection = db.collection('meetupsA');

	const meetups = await meetupsCollection.find().toArray();

	client.close();

	return {
		props: {
			meetups: meetups.map((meetup) => ({
				title: meetup.title,
				address: meetup.address,
				image: meetup.image,
				id: meetup._id.toString(),
			})),
		},
		revalidate: 10,
	};
}

export default HomePage;
