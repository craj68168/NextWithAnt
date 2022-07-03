import { useFormik } from "formik";
import * as yup from "yup";
import { useRouter } from "next/router";
import Card from "../ui/Card";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import classes from "./NewMeetupForm.module.css";
import { useMutation, useQueryClient } from "react-query";
import styled from 'styled-components'
const Form = styled.form`
padding: 1rem;
`
const ControlDiv = styled.div`
margin-bottom: 0.5rem;
& label {
  display: block;
  font-weight: bold;
  margin-bottom: 0.5rem; 
}
& input, 
& textarea {
  display: block;
  font: inherit;
  border-radius: 4px;
  border: 1px solid #ccc;
  padding: 0.25rem;
  width: 100%;
}
`
const ActionDiv = styled.div`
margin-top: 1rem;
  text-align: right;
  & button {
    font: inherit;
    cursor: pointer;
    background-color: #77002e;
    color: white;
    padding: 0.5rem 1.5rem;
    border: 1px solid #77002e;
    border-radius: 4px;
    font-weight: bold;
  }

 & button:hover, & button:active {
  background-color: #a50e48;
  border-color: #a50e48;
}
`
interface FormikInitalValues {
  title: string;
  description: string;
  image: string;
  address: string;
}
interface Message {
  message: string;
}
const formikSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup
    .string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters"),
  image: yup.string().required("Image is required"),
  address: yup.string().required("Address is required"),
});
function NewMeetupForm({ onAddMeetup }: any): JSX.Element {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      image: "",
      address: "",
    },
    validationSchema: formikSchema,
    onSubmit: async (values: FormikInitalValues) => {
      await mutateAsync(values);
    },
  });

  const cache = useQueryClient();
  const { isLoading, mutateAsync } = useMutation("addNewMeetups", onAddMeetup, {
    onSuccess: (data: Message) => {
      cache.invalidateQueries("meetupData");
      toast.success(data?.message);
      setTimeout(() => {
        router.replace("/");
      }, 1000);
    },
    onError: (err: any) => {
      toast.error("Something Went Wrong");
    },
  });

  return (
    <Card>
      <Form onSubmit={formik.handleSubmit}>
        <ControlDiv >
          <label htmlFor="title">Meetup Title</label>
          <input
            type="text"
            name="title"
            id="title"
            onChange={formik.handleChange}
            value={formik.values.title}
          />
          <span style={{ color: "red" }}>
            {formik.touched.title && formik.errors.title
              ? formik.errors.title
              : ""}
          </span>
        </ControlDiv>
        <ControlDiv >
          <label htmlFor="image">Meetup Image</label>
          <input
            name="image"
            id="image"
            onChange={formik.handleChange}
            value={formik.values.image}
          />
          <span style={{ color: "red" }}>
            {formik.touched.image && formik.errors.image
              ? formik.errors.image
              : ""}
          </span>
        </ControlDiv>
        <ControlDiv >
          <label htmlFor="address">Address</label>
          <input
            type="text"
            name="address"
            id="address"
            onChange={formik.handleChange}
            value={formik.values.address}
          />
          <span style={{ color: "red" }}>
            {formik.touched.address && formik.errors.address
              ? formik.errors.address
              : ""}
          </span>
        </ControlDiv>
        <ControlDiv >
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            rows={5}
            onChange={formik.handleChange}
            value={formik.values.description}
          ></textarea>
          <span style={{ color: "red" }}>
            {formik.touched.description && formik.errors.description
              ? formik.errors.description
              : ""}
          </span>
        </ControlDiv>
        <ActionDiv >
          <button disabled={isLoading}>Add Meetup</button>
        </ActionDiv>
      </Form>
      {/* <ToastContainer position="right-bottom" /> */}
    </Card>
  );
}

export default NewMeetupForm;
