import React, { useState } from "react";
import Logo from "../../assets/instatragos.png";

import Footer from "../../components/footer.component";
import Button from "../../components/button.component";
import Input from "../../components/input.component";
import Text from "../../components/text.component";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    alert("Message sent!");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-col lg:flex-row flex-1">
        <div className="flex-1 flex justify-center items-center p-8 lg:p-12 lg:items-start">
          <div className="max-w-lg">
            <Text type="title" variant="secondary">CONTACTO</Text>
            <Text type="description" variant="secondary">
              Have a specific inquiry or looking to explore new opportunities? Our experienced team is ready to engage with you.
            </Text>

            <form className="mt-8 bg-slate-800 rounded-lg p-6 shadow-md space-y-4">
              <Input value={formData.name} onChange={handleInputChange} placeholder="Nombre" />
              <Input value={formData.email} onChange={handleInputChange} placeholder="Correo electrónico" />
              <Input value={formData.subject} onChange={handleInputChange} placeholder="Asunto" />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Mensaje"
                rows={6}
                className="w-full rounded-md px-6 bg-[#f0f1f2] text-sm pt-3 outline-none"
              />
              <Button onClick={handleSubmit} className="w-full inline-flex h-12 items-center justify-center rounded bg-zinc-200 px-6 shadow-md outline-none transition duration-200 text-xs font-semibold uppercase tracking-wider text-slate-900 hover:shadow-lg focus:ring">
                Enviar
              </Button>
            </form>
          </div>
        </div>

        <div className="hidden lg:flex lg:w-1/2 justify-center items-center p-8">
          <img src={Logo} className="w-2/3 object-contain" alt="Insta Tragos Logo" />
        </div>
      </div>

      <Footer/>
    </div>
  );
};

export default Contact;
