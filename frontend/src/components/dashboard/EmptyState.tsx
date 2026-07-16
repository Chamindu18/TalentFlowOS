interface Props {
  title: string;
  description: string;
}

export default function EmptyState({
  title,
  description,
}: Props) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 py-16 text-center">
      <h3 className="text-lg font-semibold">
        {title}
      </h3>

      <p className="mt-2 max-w-md text-slate-500">
        {description}
      </p>
    </div>
  );
}