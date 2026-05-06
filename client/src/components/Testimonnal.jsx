import { FaStar, FaQuoteLeft } from 'react-icons/fa';
import Section from './ui/Section';
import SectionHeader from './ui/SectionHeader';
import Carousel from './ui/Carousel';

const testimonials = [
	{
		id: 1,
		name: 'Priya Sharma',
		location: 'Mumbai, Maharashtra',
		rating: 5,
		review:
			'Amazing service! They picked up my old clothes right from my doorstep and gave me a fair price. The staff was very professional and the payment was instant.',
		avatar: 'PS',
	},
	{
		id: 2,
		name: 'Rajesh Kumar',
		location: 'Delhi, NCR',
		rating: 5,
		review:
			"I've been using Cloth2Cash for 6 months now. Their rates are the best in the market and the pickup is always on time. Highly recommended!",
		avatar: 'RK',
	},
	{
		id: 3,
		name: 'Anita Gupta',
		location: 'Bangalore, Karnataka',
		rating: 5,
		review:
			'Love the concept of earning while helping the environment. The tree plantation initiative is wonderful. Great service overall!',
		avatar: 'AG',
	},
	{
		id: 4,
		name: 'Vikram Singh',
		location: 'Pune, Maharashtra',
		rating: 4,
		review:
			'Quick and hassle-free service. The app is user-friendly and the staff is trustworthy. Will definitely use again.',
		avatar: 'VS',
	},
];

const TestimonialCard = ({ testimonial }) => (
	<div className="bg-white rounded-2xl p-8  border border-gray-300 h-full min-h-[300px] flex flex-col justify-between">
		<div>
			<div className="flex items-start mb-6">
				<FaQuoteLeft className="text-orange-400 text-2xl mr-4 mt-1 flex-shrink-0" />
				<div className="flex items-center">
					{[...Array(5)].map((_, i) => (
						<FaStar
							key={i}
							className={`text-lg ${
								i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'
							}`}
						/>
					))}
				</div>
			</div>
			<p className="text-gray-600 leading-relaxed mb-6 text-lg">
				"{testimonial.review}"
			</p>
		</div>
		<div className="flex items-center">
			<div className="w-14 h-14 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
				{testimonial.avatar}
			</div>
			<div>
				<h4 className="font-semibold text-gray-800 text-lg">
					{testimonial.name}
				</h4>
				<p className="text-gray-500">{testimonial.location}</p>
			</div>
		</div>
	</div>
);

const Testimonnal = () => {
	return (
		<Section>
			<SectionHeader 
				subtitle="TESTIMONIALS"
				title="What Our Customers Say"
				description="Don't just take our word for it — hear what our satisfied customers have to say."
			/>

			<Carousel 
				items={testimonials}
				renderItem={(testimonial) => <TestimonialCard testimonial={testimonial} />}
				autoSlide={true}
				slideInterval={4000}
				showDots={true}
			/>
		</Section>
	);
};

export default Testimonnal;

		