type Props = {
  title: string;
};

const SoccerBanner = ({ title }: Props) => {
  return (
    <div className="main-soccer-banner">
      <div className="soccer-banner flex flex-row items-center justify-between max-w-[137.6rem] w-full mx-auto">
        <p className="soccer-banner-title font-PremierSans">{title}</p>
      </div>
    </div>
  );
};

export default SoccerBanner;
