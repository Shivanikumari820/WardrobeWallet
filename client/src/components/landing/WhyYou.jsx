import data from "../../assets/data.png";
import delivery from "../../assets/delivery-man.png";
import reward from "../../assets/reward.png";
import tree from "../../assets/tree.png";
import weight from "../../assets/weighing-machine.png";
import waste from "../../assets/zero-waste.png";
import FeatureCard from '../ui/Card';
import SectionHeader from '../../components/ui/SectionHeader';

const features = [
    {
        icon: <img src={weight} alt="weighing machine" className="w-16 h-16 group-hover:scale-110 transition-transform duration-300" />,
        title: 'Accurate weight and optimal rates guaranteed',
        desc: "Accurate weight and optimal rates are not just promises; they're the cornerstones of our commitment.",
        gradient: 'from-orange-400 to-red-500'
    },
    {
        icon: <img src={delivery} alt="delivery" className="w-16 h-16 group-hover:scale-110 transition-transform duration-300" />,
        title: 'Our pickup staff are trusted, trained, and verified.',
        desc: 'Our pickup staff are the cornerstone of our service, embodying trustworthiness, proficiency, and reliability.',
        gradient: 'from-blue-400 to-purple-500'
    },
    {
        icon: <img src={reward} alt="reward" className="w-16 h-16 group-hover:scale-110 transition-transform duration-300" />,
        title: 'Reward Points & Gifts',
        desc: 'Get rewarded every time you sell or refer. Loyal users unlock bonus points, faster pickups, and exclusive gifts.',
        gradient: 'from-green-400 to-blue-500'
    },
    {
        icon: <img src={tree} alt="tree" className="w-16 h-16 group-hover:scale-110 transition-transform duration-300" />,
        title: 'One Tree For Your Family',
        desc: 'In our effort to minimize carbon footprint, we pledge to plant a tree for your family every year.',
        gradient: 'from-emerald-400 to-green-600'
    },
    {
        icon: <img src={data} alt="data" className="w-16 h-16 group-hover:scale-110 transition-transform duration-300" />,
        title: ' Data Privacy & Transparency',
        desc: 'Your data stays secure and never shared. Transparent pickups, trusted service — always..',
        gradient: 'from-purple-400 to-pink-500'
    },
    {
        icon: <img src={waste} alt="zero waste" className="w-16 h-16 group-hover:scale-110 transition-transform duration-300" />,
        title: 'Zero Waste Mission',
        desc: 'We ensure every cloth is recycled, reused, or upcycled — never thrown away.',
        gradient: 'from-indigo-400 to-blue-600'
    },
];

const WhyYou = () => {
    return (
        <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 relative overflow-hidden">
            {/* Decorative background elements */}
            {/* <div className="absolute top-0 left-0 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div> */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float-delayed"></div>
            <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>

            <div className="max-w-7xl mx-auto text-center relative z-10">
                <SectionHeader
                    subtitle="WHY US?"
                    title="Why you should sell to us?"
                // className="[&_p]:text-orange-500 [&_h2]:bg-gradient-to-r [&_h2]:from-gray-800 [&_h2]:via-orange-600 [&_h2]:to-gray-800 [&_div]:bg-gradient-to-r [&_div]:from-orange-400 [&_div]:to-red-500"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 md:gap-16 text-left">
                    {features.map((item, index) => (
                        <FeatureCard
                            key={index}
                            icon={item.icon}
                            title={item.title}
                            description={item.desc}
                            gradient={item.gradient}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
};

export default WhyYou;



