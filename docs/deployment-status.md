# 배포 상태 — 2026-10-25

- 배포 완료: https://kesta.kr/space
- 배포 커밋: e080a7145816017469e3c095fb5470296dc50a3d
- GitHub Actions: https://github.com/yigolabchoi/kollabkorea/actions/runs/40194004562 (attempt 2 성공)
- 변경: 김포 현대 프리미엄 아울렛 사진 3장 교체, COMING SOON 제거, 9월 → 8월 → 3월 행사순 정렬.

## 인증 복구

- 기존 워크플로는 AWS 인증 단계에서 invalid security token으로 실패.
- 사용자의 명시적 승인으로 전용 IAM 사용자 `kesta-deployer` 생성. 콘솔 로그인 비활성.
- 인라인 정책 `KestaBucketDeployment`: `ops/kesta-deployer-policy.json`과 동일. `kesta.kr` 버킷과 그 객체만 허용. 공용 IAM 사용자와 비활성 키는 변경하지 않음.
- 새 키는 GitHub `yigolabchoi/kollabkorea`의 AWS_ACCESS_KEY_ID / AWS_SECRET_ACCESS_KEY에 등록. AWS_REGION=ap-northeast-2, S3_BUCKET_NAME=kesta.kr 설정.
- 로컬 CLI는 `--profile kesta-deployer` 사용. 키 원문은 리포에 저장하지 않음. 다운로드한 임시 CSV 제거.

## 검증

- 새 키로 STS 본인 ARN 및 S3 kesta.kr/index.html 조회 성공.
- 재실행한 CI 빌드·AWS 인증·S3 업로드 성공.
- 공개 사이트가 `/assets/index-DAF53iIU.js`를 제공하며 로컬 빌드와 SHA-256 동일.
- 공개 번들에 교체 이미지 3개 경로 존재, COMING SOON 0개.
- 라이브 사진 3장 모두 원본과 SHA-256 동일.
- Chrome /space 화면에서 김포 → 더현대서울 → 성수 순서와 새 이미지 alt 확인.

## 재배포 및 복구

- main push 시 기존 GitHub Actions로 자동 배포. 필요하면 실패한 run의 `gh run rerun <run-id> --failed` 사용.
- 앱 복구는 이전 배포 커밋 640adf456d8e3c4b0b714971c34d525abdc23126의 산출물을 동일 버킷에 재배포. 새 인증 설정은 유지.
- 초기 리포 문서의 kollabkorea 버킷은 낡은 안내다. 현재 운영 버킷은 kesta.kr이며, 공개 index의 JS 경로 대조로 확인했다. kollabkorea.com 버킷은 다른 번들이므로 변경하지 않는다.
