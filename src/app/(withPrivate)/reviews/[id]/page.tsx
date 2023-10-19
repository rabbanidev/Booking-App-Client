import ReviewForm from "@/components/reviews/ReviewForm";

type IDefaultProps = {
  params: any;
};

const CreateReviewPage = ({ params }: IDefaultProps) => {
  return (
    <section className="mt-10">
      <div className="container">
        <div className="lg:mx-20">
          <ReviewForm serviceId={params.id} />
        </div>
      </div>
    </section>
  );
};

export default CreateReviewPage;
