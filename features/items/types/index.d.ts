type ItemFormValues = {
  title: string;
  description: string;
  photo: File | string;
};

type Item = ItemFormValues & {
  photo: string;
};
