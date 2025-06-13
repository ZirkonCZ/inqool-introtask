import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createAnimalSchema, CreateAnimalDto } from "../schema";

type Props = {
  onSubmit: (data: CreateAnimalDto) => void;
};

export function AnimalForm({ onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateAnimalDto>({
    resolver: zodResolver(createAnimalSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input {...register("name")} placeholder="Name" className="input" />
      {errors.name && <p>{errors.name.message}</p>}

      <select {...register("type")} className="input">
        <option value="">Select type</option>
        <option value="dog">Dog</option>
        <option value="cat">Cat</option>
        <option value="other">Other</option>
      </select>
      {errors.type && <p>{errors.type.message}</p>}

      <button type="submit" className="btn">Submit</button>
    </form>
  );
}
