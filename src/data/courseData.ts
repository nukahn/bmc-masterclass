import type { CourseData } from '@/lib/types'

export const courseData: CourseData = {
  basics: {
    title: "1단계: 비즈니스 모델의 기초 개념",
    intro: "비즈니스 모델은 기업이 어떻게 가치를 창출하고, 전달하며, 수익을 획득하는지에 대한 논리적 설계도입니다.",
    sections: [
      {
        title: "1. 비즈니스 모델의 정의",
        items: [
          {
            head: "개념적 정의",
            text: "조직이 가치(Value)를 창출(Create), 전달(Deliver), 획득(Capture)하는 원리를 설명한 것입니다."
          },
          {
            head: "왜 중요한가?",
            text: "단일 제품의 성공이 아닌, 지속적으로 수익을 낼 수 있는 '시스템(모델)' 자체를 혁신해야 생존할 수 있습니다."
          }
        ]
      },
      {
        title: "2. 비즈니스 모델 vs 경영 전략",
        items: [
          {
            head: "비즈니스 모델 (Structure)",
            text: "시스템의 작동 원리를 설명하는 '설계도'. 정태적 구조입니다."
          },
          {
            head: "경영 전략 (Action)",
            text: "경쟁 상황에서 승리하기 위한 '계획과 방향성'. 동태적 행위입니다."
          }
        ]
      },
      {
        title: "3. 비즈니스 모델의 구성 3요소",
        items: [
          {
            head: "가치 제안",
            text: "고객이 겪고 있는 문제를 해결하거나 욕구를 충족시켜 주는가?"
          },
          {
            head: "수익 메커니즘",
            text: "가치보다 낮은 비용으로 생산하여 이익을 남기는가?"
          },
          {
            head: "자원 및 프로세스",
            text: "가치를 반복적으로 제공할 수 있는 운영 체계를 갖추었는가?"
          }
        ]
      }
    ]
  },
  bmc: {
    title: "2단계: 비즈니스 모델 캔버스 (BMC) 9 블록",
    intro: "9개의 블록을 통해 비즈니스를 시각화하여 분석하는 도구입니다. 각 블록을 클릭하면 상세 설명과 예시를 확인할 수 있습니다.",
    blocks: [
      {
        id: 'kp',
        code: 'KP',
        area: 'bmc-kp',
        name: '핵심 파트너십',
        desc: '비즈니스 모델 최적화 및 리스크 감소를 위한 협력 관계',
        details: `
          <div class="space-y-3">
            <p><strong>정의:</strong> 기업이 스스로 모든 활동을 수행하는 대신, 리스크를 줄이거나 자원을 획득하기 위해 맺는 공급자 및 파트너 네트워크입니다.</p>
            <div>
              <strong class="text-blue-700 block mb-1">핵심 활동 유형:</strong>
              <ul class="list-disc pl-5 text-sm space-y-1">
                <li>최적화 및 규모의 경제 (비용 절감 목적)</li>
                <li>리스크 및 불확실성의 감소 (표준 경쟁 등)</li>
                <li>자원 및 활동의 획득 (라이선스, 인프라 공유)</li>
              </ul>
            </div>
            <div class="bg-blue-50 p-3 rounded-md border border-blue-100">
              <strong class="text-blue-800 text-xs uppercase block mb-1">Example</strong>
              <p class="text-sm">넷플릭스(Netflix)가 스마트 TV 제조사와 협력하여 리모컨에 전용 버튼을 탑재하는 것, 스포티파이(Spotify)가 음반사와 라이선스 계약을 맺는 것.</p>
            </div>
          </div>`
      },
      {
        id: 'ka',
        code: 'KA',
        area: 'bmc-ka',
        name: '핵심 활동',
        desc: '기업이 비즈니스를 운영하기 위해 반드시 수행해야 하는 일',
        details: `
          <div class="space-y-3">
            <p><strong>정의:</strong> 가치 제안을 만들고, 고객에게 전달하며, 수익을 창출하기 위해 기업이 반드시 실행해야 하는 가장 중요한 과업입니다.</p>
            <div>
              <strong class="text-blue-700 block mb-1">분류:</strong>
              <ul class="list-disc pl-5 text-sm space-y-1">
                <li>생산 (Production): 제조, 설계, 개발 (제조업 중심)</li>
                <li>문제 해결 (Problem Solving): 솔루션 제공 (컨설팅, 병원)</li>
                <li>플랫폼/네트워크 (Platform/Network): 시스템 유지보수, 매치메이킹 (IT, 중개업)</li>
              </ul>
            </div>
            <div class="bg-blue-50 p-3 rounded-md border border-blue-100">
              <strong class="text-blue-800 text-xs uppercase block mb-1">Example</strong>
              <p class="text-sm">마이크로소프트의 '소프트웨어 개발', 맥킨지의 '문제 해결 컨설팅', 배달의민족의 '플랫폼 운영 및 관리'.</p>
            </div>
          </div>`
      },
      {
        id: 'kr',
        code: 'KR',
        area: 'bmc-kr',
        name: '핵심 자원',
        desc: 'BM 실행에 필요한 핵심 자산',
        details: `
          <div class="space-y-3">
            <p><strong>정의:</strong> 비즈니스 모델이 작동하기 위해 필요한 가장 중요한 자산. 물리적일 수도 있고 무형일 수도 있습니다.</p>
            <div>
              <strong class="text-blue-700 block mb-1">유형:</strong>
              <ul class="list-disc pl-5 text-sm space-y-1">
                <li>물적 자원: 공장, 매장, 기계, 차량</li>
                <li>지적 자원: 브랜드, 특허, 저작권, 데이터베이스</li>
                <li>인적 자원: 핵심 인재, 연구원, 영업 조직</li>
                <li>재무적 자원: 현금, 신용 한도, 스톡옵션</li>
              </ul>
            </div>
            <div class="bg-blue-50 p-3 rounded-md border border-blue-100">
              <strong class="text-blue-800 text-xs uppercase block mb-1">Example</strong>
              <p class="text-sm">애플의 '브랜드'와 'iOS 생태계', 구글의 '검색 알고리즘', 인텔의 '반도체 제조 설비'.</p>
            </div>
          </div>`
      },
      {
        id: 'vp',
        code: 'VP',
        area: 'bmc-vp',
        name: '가치 제안',
        desc: '고객이 우리를 선택해야 하는 이유 (혜택의 집합)',
        details: `
          <div class="space-y-3">
            <p><strong>정의:</strong> 특정 고객 세그먼트가 겪는 문제를 해결하거나 욕구를 충족시켜 주는 혜택의 총합. 고객이 경쟁사 대신 우리를 선택하는 이유입니다.</p>
            <div>
              <strong class="text-blue-700 block mb-1">가치 요소:</strong>
              <ul class="list-disc pl-5 text-sm space-y-1">
                <li>신규성(Newness), 성능(Performance)</li>
                <li>커스터마이징(Customization), 디자인(Design)</li>
                <li>가격(Price), 비용 절감, 리스크 감소</li>
                <li>접근성(Accessibility), 편리성(Convenience)</li>
              </ul>
            </div>
            <div class="bg-blue-50 p-3 rounded-md border border-blue-100">
              <strong class="text-blue-800 text-xs uppercase block mb-1">Example</strong>
              <p class="text-sm">우버(Uber)의 '언제 어디서나 부를 수 있는 택시(편리성)', 사우스웨스트 항공의 '저렴한 항공권(가격)'.</p>
            </div>
          </div>`
      },
      {
        id: 'cr',
        code: 'CR',
        area: 'bmc-cr',
        name: '고객 관계',
        desc: '고객 확보 및 유지를 위한 관계 형성 방식',
        details: `
          <div class="space-y-3">
            <p><strong>정의:</strong> 기업이 특정 고객 세그먼트와 맺고 싶어 하는 관계의 유형. 고객 확보(Acquisition), 유지(Retention), 판매 증대(Upselling)가 주 목적입니다.</p>
            <div>
              <strong class="text-blue-700 block mb-1">관계 유형:</strong>
              <ul class="list-disc pl-5 text-sm space-y-1">
                <li>개별 어시스턴트: 사람이 직접 응대</li>
                <li>전담 어시스턴트: VIP 전담 관리 (PB 등)</li>
                <li>셀프서비스: 수단만 제공하고 고객이 직접 해결</li>
                <li>자동화된 서비스: 알고리즘 추천, 챗봇</li>
                <li>커뮤니티: 사용자 간 지식 공유</li>
              </ul>
            </div>
            <div class="bg-blue-50 p-3 rounded-md border border-blue-100">
              <strong class="text-blue-800 text-xs uppercase block mb-1">Example</strong>
              <p class="text-sm">아마존의 '개인화 추천 시스템(자동화)', 이케아의 '셀프 픽업/조립(셀프서비스)', 유튜브의 '크리에이터 커뮤니티'.</p>
            </div>
          </div>`
      },
      {
        id: 'ch',
        code: 'CH',
        area: 'bmc-ch',
        name: '채널',
        desc: '가치를 전달하는 접점 및 경로',
        details: `
          <div class="space-y-3">
            <p><strong>정의:</strong> 기업이 고객과 커뮤니케이션하고 가치를 전달하는 인터페이스. 인지, 평가, 구매, 전달, 판매 후 관리의 5단계를 포괄합니다.</p>
            <div>
              <strong class="text-blue-700 block mb-1">채널 유형:</strong>
              <ul class="list-disc pl-5 text-sm space-y-1">
                <li>직영 채널: 영업 사원, 웹사이트, 직영 매장 (마진 높음, 커버리지 낮음)</li>
                <li>파트너 채널: 도매상, 소매점, 파트너 웹사이트 (마진 낮음, 커버리지 높음)</li>
              </ul>
            </div>
            <div class="bg-blue-50 p-3 rounded-md border border-blue-100">
              <strong class="text-blue-800 text-xs uppercase block mb-1">Example</strong>
              <p class="text-sm">애플의 '앱스토어(디지털 직영)' 및 '애플 스토어(오프라인 직영)', 삼성전자의 '하이마트 입점(파트너 채널)'.</p>
            </div>
          </div>`
      },
      {
        id: 'cs',
        code: 'CS',
        area: 'bmc-cs',
        name: '고객 세그먼트',
        desc: '가치를 창출해 주고자 하는 대상',
        details: `
          <div class="space-y-3">
            <p><strong>정의:</strong> 기업이 도달하거나 서브(Serve)하고자 하는 인물이나 조직의 그룹. 누구를 위해 가치를 창출하는가?</p>
            <div>
              <strong class="text-blue-700 block mb-1">시장 유형:</strong>
              <ul class="list-disc pl-5 text-sm space-y-1">
                <li>매스 마켓 (Mass Market): 대규모, 구분 없음</li>
                <li>틈새 시장 (Niche Market): 특화된 요구사항</li>
                <li>세분화된 시장 (Segmented): 유사하지만 다른 니즈</li>
                <li>멀티사이드 플랫폼 (Multi-sided): 상호 의존적인 두 그룹</li>
              </ul>
            </div>
            <div class="bg-blue-50 p-3 rounded-md border border-blue-100">
              <strong class="text-blue-800 text-xs uppercase block mb-1">Example</strong>
              <p class="text-sm">구글의 '검색 사용자'와 '광고주' (멀티사이드), 롤스로이스의 '초고소득층' (틈새 시장).</p>
            </div>
          </div>`
      },
      {
        id: 'cost',
        code: 'C$',
        area: 'bmc-cost',
        name: '비용 구조',
        desc: 'BM 운영 시 발생하는 모든 비용',
        details: `
          <div class="space-y-3">
            <p><strong>정의:</strong> 비즈니스 모델을 운영하는 과정에서 발생하는 모든 비용의 특성입니다.</p>
            <div>
              <strong class="text-blue-700 block mb-1">비용 특성:</strong>
              <ul class="list-disc pl-5 text-sm space-y-1">
                <li>고정비 (Fixed Costs): 생산량과 무관 (임대료, 인건비)</li>
                <li>변동비 (Variable Costs): 생산량에 비례 (원자재)</li>
                <li>규모의 경제: 많이 생산할수록 단가 하락</li>
                <li>범위의 경제: 하나의 자원으로 다양한 활동 수행</li>
              </ul>
            </div>
            <div>
              <strong class="text-blue-700 block mb-1">BM 성격:</strong>
              <span class="text-sm">비용 주도형(저가 항공) vs 가치 주도형(럭셔리 호텔)</span>
            </div>
            <div class="bg-blue-50 p-3 rounded-md border border-blue-100">
              <strong class="text-blue-800 text-xs uppercase block mb-1">Example</strong>
              <p class="text-sm">저가 항공사의 '최소화된 인건비 및 서비스 비용'(비용 주도), 명품 브랜드의 '높은 마케팅 및 디자인 비용'(가치 주도).</p>
            </div>
          </div>`
      },
      {
        id: 'rev',
        code: 'R$',
        area: 'bmc-rev',
        name: '수익원',
        desc: '제공 가치에 대해 창출하는 현금 흐름',
        details: `
          <div class="space-y-3">
            <p><strong>정의:</strong> 기업이 각 고객 세그먼트로부터 창출하는 현금. (수익 - 비용 = 이익)</p>
            <div>
              <strong class="text-blue-700 block mb-1">수익 메커니즘:</strong>
              <ul class="list-disc pl-5 text-sm space-y-1">
                <li>물품 판매 (Asset Sale): 소유권 판매</li>
                <li>이용료 (Usage Fee): 사용량 비례</li>
                <li>가입비/구독료 (Subscription Fees): 기간제 사용권</li>
                <li>대여/임대료 (Lending/Renting/Leasing)</li>
                <li>라이선싱 (Licensing): 지적재산권 사용료</li>
                <li>중개 수수료 (Brokerage Fees), 광고 (Advertising)</li>
              </ul>
            </div>
            <div class="bg-blue-50 p-3 rounded-md border border-blue-100">
              <strong class="text-blue-800 text-xs uppercase block mb-1">Example</strong>
              <p class="text-sm">테슬라의 '차량 판매 수익(물품 판매)', 넷플릭스의 '월 정액료(구독)', 페이스북의 '광고 수익'.</p>
            </div>
          </div>`
      }
    ]
  },
  patterns: {
    title: "3단계: 주요 비즈니스 모델 패턴",
    intro: "성공적인 비즈니스 모델의 90%는 기존 패턴의 재조합입니다. 각 패턴을 클릭하여 상세 내용과 시각화 자료를 확인하세요.",
    list: [
      {
        title: "언번들링 (Unbundling)",
        summary: "제품/서비스 분리 판매. (예: 음원 스트리밍)",
        text: "기존에 하나로 묶여 있던 제품이나 서비스를 분리하여 개별적으로 판매하는 방식입니다. <br><br><strong class='text-slate-800'>[사례]</strong> 음반(앨범) → 음원(스트리밍), 종합 통신사 → 알뜰폰.<br><strong class='text-slate-800'>[효과]</strong> 불필요한 비용 제거, 핵심 역량 집중."
      },
      {
        title: "롱테일 (The Long Tail)",
        summary: "다수의 틈새 상품 판매. (예: 아마존)",
        text: "소수의 히트 상품(Head)보다, 다수의 틈새 상품(Tail)의 합이 더 큰 수익을 창출하는 현상입니다. <br><br><strong class='text-slate-800'>[사례]</strong> 아마존, 넷플릭스 (오프라인에 없는 비주류 상품 판매).<br><strong class='text-slate-800'>[핵심]</strong> 낮은 재고 비용, 추천 알고리즘.",
        hasChart: true
      },
      {
        title: "멀티사이드 플랫폼",
        summary: "상호 의존적 그룹 연결. (예: 구글)",
        text: "서로 다른 두 개 이상의 고객 그룹을 연결하여 가치를 창출합니다. <br><br><strong class='text-slate-800'>[사례]</strong> 구글(검색자&광고주), 배달앱(식당&주문자).<br><strong class='text-slate-800'>[핵심]</strong> 네트워크 효과 (사용자가 늘수록 가치 증대)."
      },
      {
        title: "프리미엄 (Freemium)",
        summary: "기본 무료, 고급 유료. (예: 드롭박스)",
        text: "기본 서비스는 무료(Free)로 제공하여 사용자를 모으고, 고급 기능은 유료(Premium)로 전환합니다. <br><br><strong class='text-slate-800'>[사례]</strong> 드롭박스, 에버노트, 게임.<br><strong class='text-slate-800'>[핵심]</strong> 한계 비용 0에 수렴, 유료 전환율 관리."
      },
      {
        title: "구독 (Subscription)",
        summary: "사용 권한 판매. (예: 넷플릭스)",
        text: "제품 소유권이 아닌, 일정 기간 사용 권한을 판매합니다. <br><br><strong class='text-slate-800'>[사례]</strong> 넷플릭스, MS Office 365, 정수기 렌탈.<br><strong class='text-slate-800'>[효과]</strong> 예측 가능한 반복 수익(Recurring Revenue)."
      }
    ]
  },
  aiLab: {
    title: "4단계: AI 비즈니스 모델링 실습",
    intro: "Gemini AI를 활용하여 나만의 아이디어를 비즈니스 모델 캔버스(BMC)로 변환해보세요. 필수 항목(고객, 가치 제안)을 입력하고, 필요한 추가 요소를 선택하여 입력하면 더욱 정교한 모델을 생성할 수 있습니다."
  }
}

// BMC Block Configuration
export const BMC_BLOCK_CONFIG = [
  { key: 'kp' as const, code: 'KP', area: 'bmc-kp', name: '핵심 파트너십 (KP)' },
  { key: 'ka' as const, code: 'KA', area: 'bmc-ka', name: '핵심 활동 (KA)' },
  { key: 'kr' as const, code: 'KR', area: 'bmc-kr', name: '핵심 자원 (KR)' },
  { key: 'vp' as const, code: 'VP', area: 'bmc-vp', name: '가치 제안 (VP)' },
  { key: 'cr' as const, code: 'CR', area: 'bmc-cr', name: '고객 관계 (CR)' },
  { key: 'ch' as const, code: 'CH', area: 'bmc-ch', name: '채널 (CH)' },
  { key: 'cs' as const, code: 'CS', area: 'bmc-cs', name: '고객 세그먼트 (CS)' },
  { key: 'cost' as const, code: 'C$', area: 'bmc-cost', name: '비용 구조 (C$)' },
  { key: 'rev' as const, code: 'R$', area: 'bmc-rev', name: '수익원 (R$)' },
]

// Optional block options for AI Lab
export const OPTIONAL_BLOCK_OPTIONS = [
  { value: 'ch', label: '채널 (CH)' },
  { value: 'cr', label: '고객 관계 (CR)' },
  { value: 'rev', label: '수익원 (R$)' },
  { value: 'kr', label: '핵심 자원 (KR)' },
  { value: 'ka', label: '핵심 활동 (KA)' },
  { value: 'kp', label: '핵심 파트너십 (KP)' },
  { value: 'cost', label: '비용 구조 (C$)' },
]
