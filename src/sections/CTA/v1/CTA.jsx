import Button from "@components/button";
import CardHover from "@components/cardHover";
import CTAStyleWrapper from "./CTA.style";

const CTA = () => {
  return (
    <CTAStyleWrapper>
      <div className="container">
        <div className="cta-area text-center">
          <h2 className="title">
            Create Collection <br />
          </h2>
          <div className="dsc">
            If you want to lanuch a Collection, It will be your perfect choice
          </div>
          <Button variant="mint" md href="/igo-apply">
            Create Collection
          </Button>
          <CardHover />
        </div>
      </div>
    </CTAStyleWrapper>
  );
};

export default CTA;
