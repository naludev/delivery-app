import { forwardRef } from "react";
import Text from "../../../components/Text";
import LinkButtonSolid from "../../../components/LinkButtonSolid";

const AboutSection = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div ref={ref} className="w-full md:w-1/2 flex flex-col">
      <div className="bg-slate-900 bg-opacity-60 p-12 flex flex-col items-center">
        <div className="p-4 flex flex-col items-center">
          <Text className="px-3 text-center max-w-xs md:max-w-xl" type="title" variant="secondary">
            Acerca de nosotrxs
          </Text>
          <div className="flex flex-col items-center">
            <Text type="description" className="py-3 text-center" variant="secondary">
              Desde cócteles sofisticados hasta cervezas refrescantes, te llevamos el bar a tu puerta sin colas ni estrés. ¡Buena onda y bebidas a domicilio al alcance de tu mano!
            </Text>
            <Text className="px-3 text-center max-w-xs md:max-w-xl" type="description" variant="secondary">
              Tu compañía ideal para noches épicas y reuniones improvisadas
            </Text>
          </div>
        </div>
        <LinkButtonSolid label="Ver más" href="/" />
      </div>
    </div>
  );
});

export default AboutSection;
