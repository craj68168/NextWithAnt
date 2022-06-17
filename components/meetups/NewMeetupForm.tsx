import { useFormik } from "formik";
import * as yup from "yup";
import { useRouter } from "next/router";
import Card from "../ui/Card";
import { Button } from "antd";
import classes from "./NewMeetupForm.module.css";

import { useMutation, useQueryClient } from "react-query";
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
    onSubmit: async (values: any) => {
      await mutateAsync(values);
    },
  });

  const cache = useQueryClient();
  const { isLoading, mutateAsync } = useMutation("addNewMeetups", onAddMeetup, {
    onSuccess: () => {
      cache.invalidateQueries("meetupData");
      router.replace("/");
    },
    onError: (err: any) => {
      console.log(" mutation error", err);
    },
  });

  return (
    <Card>
      <form className={classes.form} onSubmit={formik.handleSubmit}>
        <div className={classes.control}>
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
        </div>
        <div className={classes.control}>
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
        </div>
        <div className={classes.control}>
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
        </div>
        <div className={classes.control}>
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
        </div>
        <div className={classes.actions}>
          <button disabled={isLoading}>Add Meetup</button>
        </div>
      </form>
    </Card>
  );
}

export default NewMeetupForm;
