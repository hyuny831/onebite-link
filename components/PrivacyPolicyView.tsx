import Link from "next/link";

const SECTIONS = [
  {
    title: "1. 수집하는 개인정보 항목",
    body: [
      "OneBite Link는 회원가입 및 서비스 제공을 위해 아래와 같은 개인정보를 수집합니다.",
      "· 이메일 주소, 비밀번호(암호화 저장)",
      "· 카카오 로그인 이용 시 카카오 계정에서 제공하는 식별 정보",
      "· 이용자가 저장한 링크, 폴더 정보 등 서비스 이용 과정에서 생성되는 정보",
    ],
  },
  {
    title: "2. 개인정보의 수집 및 이용 목적",
    body: [
      "수집한 개인정보는 다음의 목적을 위해 이용합니다.",
      "· 회원 식별 및 로그인 등 회원제 서비스 제공",
      "· 링크 저장, 폴더 관리 등 서비스의 핵심 기능 제공",
      "· 서비스 문의 응대 및 공지사항 전달",
    ],
  },
  {
    title: "3. 개인정보의 보유 및 이용 기간",
    body: [
      "이용자의 개인정보는 회원 탈퇴 시까지 보유하며, 탈퇴 후에는 지체 없이 파기합니다. 다만 관계 법령에 따라 보존할 필요가 있는 경우 해당 법령에서 정한 기간 동안 보관합니다.",
    ],
  },
  {
    title: "4. 개인정보의 제3자 제공",
    body: [
      "OneBite Link는 이용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다. 다만 서비스 운영을 위해 데이터베이스 및 인증 기능을 위탁하고 있는 Supabase 등 인프라 제공업체에 한해 서비스 제공에 필요한 범위 내에서 처리를 위탁할 수 있습니다.",
    ],
  },
  {
    title: "5. 이용자의 권리",
    body: [
      "이용자는 언제든지 자신의 개인정보를 열람, 정정, 삭제할 수 있으며, 회원 탈퇴를 통해 개인정보 이용에 대한 동의를 철회할 수 있습니다.",
    ],
  },
  {
    title: "6. 문의처",
    body: [
      "개인정보 처리에 관한 문의사항은 아래 이메일로 연락해 주세요.",
      "· contact@onebite.link",
    ],
  },
];

export default function PrivacyPolicyView() {
  return (
    <div className="min-h-screen bg-[var(--background)] px-6 py-12">
      <div className="mx-auto w-full max-w-2xl">
        <Link
          href="/"
          className="mb-8 flex items-center justify-center gap-2 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50"
        >
          <span className="text-2xl">🔗</span>
          OneBite Link
        </Link>

        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          개인정보 처리방침
        </h1>
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">시행일: 2026년 9월 28일</p>

        <div className="mt-8 flex flex-col gap-8">
          {SECTIONS.map((section) => (
            <section key={section.title}>
              <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
                {section.title}
              </h2>
              <div className="mt-2 flex flex-col gap-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                {section.body.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-zinc-500 dark:text-zinc-400">
          <Link href="/" className="font-medium text-zinc-900 hover:underline dark:text-zinc-50">
            홈으로 돌아가기
          </Link>
        </p>
      </div>
    </div>
  );
}
