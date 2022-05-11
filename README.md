# setup-allurectl

## How to use

1. Allure TestOps instanse required
2. Create token
3. Create project
4. Use following workflow

  ```
  on: [push]

  jobs:
    tests:
      runs-on: ubuntu-latest
      steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-java@v3
        with:
          distribution: 'zulu'
          java-version: '17'
          cache: 'gradle'
      - uses: allure-framework/setup-allurectl@v1
        with: 
          allure-endpoint: https://where.is.allure
          allure-token: ${{ secret.ALLURE_TOKEN }}
          allure-project-id: 1
      - run: allurect watch -- ./gradlew clean test
        env: 
          ALLURE_RESULTS: build/allure-results
  ```
