export default function Footer() {
  return (
    <footer className="mt-12 pt-6 border-t border-slate-200 text-center text-slate-500 text-sm">
      <p>
        © {new Date().getFullYear()} 비즈니스 모델 마스터 클래스.
        <span className="block sm:inline sm:ml-1">
          Powered by Gemini API
        </span>
      </p>
    </footer>
  )
}
