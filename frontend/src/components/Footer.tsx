import Logo from '../assets/instatragos.png';
import email from '../assets/email.png';
import ig from '../assets/ig.png';
import wsp from '../assets/wsp.png';
import Text from './Text';

const Footer = () => {
  return (
    <div className="w-full flex flex-col items-center self-center bg-slate-950 bg-opacity-60 p-2">
      <div className="w-full flex justify-center items-center p-3">
        <img className="object-cover w-10" src={Logo} alt="Logo" />
        <div className="flex items-center">
        <a className="relative flex overflow-hidden m-2" href="#">
            <img className="w-4 h-4 invert" src={wsp} alt="Whatsapp" />
          </a>
          <a className="relative flex overflow-hidden m-2" href="#">
            <img className="w-4 h-4 invert" src={ig} alt="Instagram" />
          </a>
          <a className="relative flex overflow-hidden m-2" href="#">
            <img className="w-4 h-4 invert" src={email} alt="Email" />
          </a>
        </div>
      </div>
      <Text type="description" className="text-white font-bold">
              2024 ®
        </Text>
    </div>
  );
};

export default Footer;
