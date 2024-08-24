import Text from "@components/text";
import qualityimg from "@assets/quality.png";
import drinksimg from "@assets/drinks3.png";
import rayoimg from "@assets/rayo.png";

interface SectionProps {
  imgSrc: string;
  imgAlt: string;
  imgClass?: string;
  title: string;
  description: string;
}

export const renderSection = ({ imgSrc, imgAlt, imgClass, title, description }: SectionProps) => (
  <div className="flex flex-row items-center gap-4">
    <div className="w-20 flex justify-center items-start">
      <img className={`w-20 ${imgClass || ""}`} src={imgSrc} alt={imgAlt} />
    </div>
    <div className="flex-1">
      <Text className="text-start" type="subtitle" variant="secondary">
        {title}
      </Text>
      <Text className="text-start mt-2" type="description" variant="secondary">
        {description}
      </Text>
    </div>
  </div>
);

export const sections = [
  {
    imgSrc: qualityimg,
    imgAlt: "Calidad inigualable",
    imgClass: "invert p-2",
    title: "Calidad inigualable",
    description: "Trabajamos con los mejores bartenders y marcas para asegurarnos de que cada trago que pidas sea una obra de arte, listo para ser disfrutado en cualquier ocasión",
  },
  {
    imgSrc: drinksimg,
    imgAlt: "Variedad",
    title: "Variedad",
    description: "Desde clásicos como el Mojito y el Negroni, hasta creaciones exclusivas y estacionales, nuestra carta de tragos tiene algo para cada gusto",
  },
  {
    imgSrc: rayoimg,
    imgAlt: "Rapidez y conveniencia",
    imgClass: "w-10 h-20 brightness-[4.5]",
    title: "Rapidez y conveniencia",
    description: "Sabemos que el tiempo es valioso. Por eso, nos aseguramos de que tu pedido llegue rápidamente, para que puedas disfrutar sin demoras",
  },
];