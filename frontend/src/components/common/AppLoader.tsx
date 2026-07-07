export default function AppLoader() {
  return (
    <div
      className="
        flex
        min-h-screen
        items-center
        justify-center
        bg-slate-50
      "
    >
      <div className="text-center">
        {/* Spinner */}
        <div
          className="
            mx-auto
            h-14
            w-14
            animate-spin
            rounded-full
            border-4
            border-slate-200
            border-t-[#FF5B1F]
          "
        />

        {/* Logo */}
        <h1
          className="
            mt-6
            text-3xl
            font-bold
            text-[#FF5B1F]
          "
        >
          TalentFlow OS
        </h1>

        {/* Subtitle */}
        <p
          className="
            mt-2
            text-sm
            font-medium
            text-slate-500
          "
        >
          Loading application...
        </p>
      </div>
    </div>
  );
}