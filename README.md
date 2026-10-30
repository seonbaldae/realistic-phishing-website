# 모의 네이버 폼 · QR 피싱 예방 해커톤

네이버 폼을 연상시키는 가상 설문 화면입니다. `설문 참여하기 → 세션 만료 안내 → 모의 로그인 → 설문 작성 → 완료` 흐름을 체험할 수 있습니다.

## 실행

이 디렉토리에서 다음 명령을 실행하고 [로컬 페이지](http://127.0.0.1:8080)를 여세요.

```sh
python3 -m http.server 8080 --bind 127.0.0.1
```

빌드나 패키지 설치가 필요하지 않습니다. 브라우저 기본 ES Modules를 사용하므로 `index.html`을 파일로 직접 열지 말고 정적 서버로 실행하세요.

## GitHub → Vercel 자동 배포

배포 주소: [realistic-phishing-website.vercel.app](https://realistic-phishing-website.vercel.app/) · [Vercel 프로젝트](https://vercel.com/naruterides-projects/realistic-phishing-website)

`seonbaldae/realistic-phishing-website` 저장소가 연결되어 있으며 Production Branch는 `main`입니다. 아래는 같은 연결을 다시 구성할 때의 절차입니다.

`vercel.json`에 정적 사이트 설정이 포함되어 있습니다. 프레임워크는 **Other**, 설치·빌드 명령은 비워 두고, 출력 디렉토리는 **`.`**(저장소 루트)를 사용합니다. 의존성이나 환경 변수는 필요하지 않습니다.

자동 배포에는 Vercel과 GitHub 저장소를 최초 한 번 연결해야 합니다. 설정 파일을 푸시하는 것만으로 계정 연결이 만들어지지는 않습니다.

1. [Vercel 새 프로젝트](https://vercel.com/new)를 열고 GitHub 계정으로 로그인합니다.
2. **Import Git Repository**에서 `seonbaldae/realistic-phishing-website`를 선택합니다. 저장소가 보이지 않으면 Vercel GitHub App에 해당 저장소 접근을 허용합니다.
3. **Root Directory**를 저장소 루트(`./`), **Framework Preset**을 **Other**로 두고 배포합니다. 저장소의 `vercel.json`이 설치·빌드·출력 설정을 지정합니다.
4. 프로젝트의 **Settings → Git**에서 연결된 저장소를 확인하고, **Settings → Environments → Production → Branch Tracking**에서 Production Branch가 **main**인지 확인합니다.

연결 후에는 `main`에 푸시할 때마다 Production 배포가 갱신됩니다. 다른 브랜치나 PR에는 Preview 배포가 생성됩니다. 별도의 GitHub Actions나 `VERCEL_TOKEN`은 필요하지 않습니다. 프로젝트가 이미 존재한다면 새 프로젝트를 만들지 말고 해당 프로젝트의 Git 설정에서 이 저장소를 연결하세요.

`.vercelignore`는 CLI 업로드 대상을 정적 사이트 파일로 제한하며, `.gitignore`는 로컬 Vercel 연결 정보(`.vercel/`)가 Git에 포함되는 것을 방지합니다.

## 시연

1. **설문 참여하기**를 누르면 세션 만료 안내가 나옵니다. 취소 또는 Escape로 닫을 수 있습니다.
2. **로그인하기**를 누르면 고정된 가상 계정이 있는 모의 로그인 화면으로 이동합니다.
3. **모의 계정으로 로그인**하면 3문항 설문을 작성할 수 있습니다. 실제 계정 정보는 필요하지 않습니다.
4. 필수 문항을 선택하고 제출하면 로컬 완료 화면이 나옵니다. **처음으로 돌아가기** 또는 새로고침으로 처음부터 체험할 수 있습니다.

## 구성과 데이터

순수 JavaScript·HTML·CSS와 Custom Elements만 사용합니다. 각 UI는 열린 Shadow DOM을 가지며 컴포넌트 간 통신에는 CustomEvent를 사용합니다. 외부 라이브러리·폰트·이미지 요청, API, 인증, 브라우저 저장소는 사용하지 않습니다. 계정과 설문 응답은 전송·저장되지 않습니다. CSP의 `connect-src 'none'`, `form-action 'none'`으로 통신과 기본 폼 제출도 제한합니다.

`src/components/`에 UI 컴포넌트, `src/data/survey.js`에 설문 소개, `src/styles/`에 공통 토큰과 스타일이 있습니다. 커버 일러스트는 직접 작성한 정적 SVG입니다. 실제 네이버 페이지 소스나 인증 스크립트는 포함하지 않습니다.

헤더·로그인·푸터의 NAVER 로고는 [네이버 공식 브랜드 리소스](https://www.navercorp.com/company/brandGuide)의 원본 `Logotype_Green.svg`입니다. [공식 배포 자료](https://static-homepage.pstatic.net/cdn-static/naver/download/NaverBrand_Resource.zip)에서 가져온 파일을 `assets/naver-logo.svg`에 그대로 보관하고 `<img>`로 표시합니다. 로고 이미지는 같은 출처에서 제공하며 색상·비율을 변형하지 않습니다.

추가 로고는 `demo-service-logos` 컴포넌트로 설문 소개와 모의 로그인 화면에 표시합니다. 네이버 폼·N 심볼도 헤더, 세션 안내, 설문 작성 및 완료 화면에 배치합니다. 서비스 아이콘은 로고 감지 시연용 이미지이며, 실제 서비스 연결이나 인증 기능은 없습니다.

| 로컬 파일 | 공식 출처 페이지 | 원본 에셋 |
| --- | --- | --- |
| `assets/naver-favicon.ico` | [네이버](https://www.naver.com/) | [파비콘 ICO](https://www.naver.com/favicon.ico?1) |
| `assets/naver-symbol.png` | [네이버](https://www.naver.com/) | [N 심볼 PNG](https://s.pstatic.net/static/www/nFavicon96.png) |
| `assets/naver-form-icon.svg` | [네이버 폼](https://form.naver.com/) | [폼 아이콘 SVG](https://survey.pstatic.net/nform/icon/favicon.svg) |
| `assets/naver-map-icon.png` | [네이버 지도](https://map.naver.com/) | [지도 아이콘 PNG](https://ssl.pstatic.net/static/maps/assets/icons/android-icon-192x192.png) |
| `assets/naver-shopping-icon.ico` | [네이버 쇼핑](https://shopping.naver.com/) | [쇼핑 아이콘 ICO](https://shopv.pstatic.net/web/r/20261028105322/_next/static/ico/favicon_shopping.ico) |

각 공식 페이지의 `icon` 또는 `apple-touch-icon` 링크에서 원본 파일을 가져왔습니다. 브라우저 탭은 네이버 원본 파비콘을, 홈 화면 아이콘은 공식 96×96 N 심볼을 사용합니다. 모두 로컬 자산이므로 페이지 실행 시 네이버 서버로 요청하지 않습니다.

분석기에서 입력 필드 등을 검사할 때는 각 요소의 `shadowRoot` 안까지 순회해야 합니다. Shadow DOM은 보안 격리가 아니며, 이 저장소에는 QR 분석 API나 격리 Worker가 포함되지 않습니다.

이 페이지는 해커톤 보안 훈련용으로 표시된 모의 서비스입니다. 실제 계정 정보를 입력하지 마세요. 정적 서버 로그에는 자산 요청 경로만 남으며, 시연 상태는 새로고침하면 초기화됩니다.
