import { FaWhatsapp } from 'react-icons/fa';

const WhatsApp = () => {
  const phoneNumber = '+916299974421';
  const message = 'Hello! I am interested in Cloth2Cash services.';

  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      title="Chat with us on WhatsApp"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 w-16 h-16 bg-green-600 hover:bg-green-700 text-white rounded-full flex items-center justify-center text-2xl shadow-2xl transition-all duration-300 z-[9999] hover:scale-110 active:scale-95"
    >
      <FaWhatsapp />
    </button>
  );
};

export default WhatsApp;
