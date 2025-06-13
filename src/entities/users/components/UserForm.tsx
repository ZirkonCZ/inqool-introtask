import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserSchema, CreateUserDto } from "../schema";

type Props = {
  onSubmit: (data: CreateUserDto) => void;
};

export function UserForm({ onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserDto>({
    resolver: zodResolver(createUserSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input {...register("name")} placeholder="Name" className="input" />
      {errors.name && <p>{errors.name.message}</p>}

      <select {...register("gender")} className="input">
        <option value="">Select gender</option>
        <option value="female">Female</option>
        <option value="male">Male</option>
        <option value="other">Other</option>
      </select>
      {errors.gender && <p>{errors.gender.message}</p>}
    {/* 
      <label>
        <input type="checkbox" {...register("banned")} />
        Banned
      </label> */}

      <button type="submit" className="btn">Submit</button>
    </form>
  );
}
