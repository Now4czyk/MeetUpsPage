import { MongoClient, ObjectId } from 'mongodb';
import { Fragment } from 'react';
import MeetUpDetail from '../../components/meetups/MeetupDetail';
import Head from 'next/head';

const MeetUpDetails = (props) => {
	return (
		<Fragment>
			<Head>
				<title>{props.meetupData.title}</title>
				<meta name='description' content={props.meetupData.description} />
			</Head>

			<MeetUpDetail
				image={props.meetupData.image}
				title={props.meetupData.title}
				address={props.meetupData.address}
				description={props.meetupData.description}
			/>
		</Fragment>
	);
};

export async function getStaticPaths() {
	const client = await MongoClient.connect(
		'mongodb+srv://Now4czyk:Kacpern30@cluster0.h0u5c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
	);
	const db = client.db();

	const meetupsCollection = db.collection('meetupsA');

	const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray(); //describe this

	client.close();
	return {
		fallback: false,
		paths: meetups.map((meetup) => ({
			params: {
				meetupId: meetup._id.toString(),
			},
		})),
	};
}

export async function getStaticProps(context) {
	const meetupId = context.params.meetupId;

	const client = await MongoClient.connect(
		'mongodb+srv://Now4czyk:Kacpern30@cluster0.h0u5c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
	);
	const db = client.db();

	const meetupsCollection = db.collection('meetupsA');

	const selectedMeetup = await meetupsCollection.findOne({
		_id: ObjectId(meetupId),
	});

	client.close();

	return {
		props: {
			meetupData: {
				title: selectedMeetup.title,
				description: selectedMeetup.description,
				id: selectedMeetup._id.toString(),
				image: selectedMeetup.image,
				address: selectedMeetup.address,
			},
		},
	};
}

export default MeetUpDetails;
