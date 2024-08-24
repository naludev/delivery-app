import { forwardRef } from "react";
import Text from "@components/text";
import { Step, StepsProps } from "../utils";

const StepCard: React.FC<Step> = ({ title, description, img }) => (
  <div className="p-4 flex flex-col items-center">
    <img className="inline-block h-12 w-12 ring-white invert m-2" src={img} alt="{user.handle}"/>
    <Text className="px-3 text-center max-w-xs md:max-w-xl" type="subtitle" variant="secondary">
      {title}
    </Text>
    <Text type="description" className="py-3 text-center" variant="secondary">
      {description}
    </Text>
  </div>
);

const StepsSection = forwardRef<HTMLDivElement, StepsProps>(({ steps }, ref) => {
  return (
    <div ref={ref} className="w-full flex flex-col items-center self-center p-10">
      <div className="p-4 flex flex-col md:flex-row items-center">
        {steps.map((step, index) => (
          <StepCard key={index} title={`Paso ${index + 1}`} description={step.description} img={step.img} />
        ))}
      </div>
    </div>
  );
});

export default StepsSection;
