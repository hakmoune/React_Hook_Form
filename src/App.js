import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  firstname: z.string().includes("#"),
  password: z.string().min(4),
});

function App() {
  // register: to regdister the input with react hook form
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      firstname: "Firstname...",
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(data);
      throw new Error();
    } catch (error) {
      setError("root", {
        message: "This firstname is already taken",
      });
    }
  };

  return (
    <div>
      <h1>useForm Hook</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="firstname">First Name</label>
          <input type="text" id="firstname" {...register("firstname")} />
        </div>
        {errors.firstname && (
          <div style={{ color: "red" }}>{errors.firstname.message}</div>
        )}
        <br />

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            autoComplete="on"
            {...register("password")}
          />
        </div>
        {errors.password && (
          <div style={{ color: "red" }}>{errors.password.message}</div>
        )}
        <br />

        <button type="submi" disabled={isSubmitting}>
          {isSubmitting ? "Loading..." : "Submit"}
        </button>

        {errors.root && (
          <div style={{ color: "red" }}>{errors.root.message}</div>
        )}
      </form>
    </div>
  );
}

export default App;
