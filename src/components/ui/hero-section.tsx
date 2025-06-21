interface HeroSectionProps {
  title: string;
  description: string;
  backgroundImage: string;
}

export const HeroSection = ({
  title,
  description,
  backgroundImage,
}: HeroSectionProps) => {
  return (
    <div
      className="relative bg-cover bg-center h-[500px]"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
          {title}
        </h1>
        <p className="text-xl md:text-2xl text-center max-w-3xl">
          {description}
        </p>
      </div>
    </div>
  );
};