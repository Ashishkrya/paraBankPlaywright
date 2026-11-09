
pipeline {
    agent any

    stages {

        stage('Clean Allure Results') {
            steps {
                dir('C:\\Users\\Ashish15046\\ParabankPlaywright') {
                    bat '''
                        if exist allure-results rmdir /s /q allure-results
                        if exist allure-report rmdir /s /q allure-report
                    '''
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                dir('C:\\Users\\Ashish15046\\ParabankPlaywright') {
                    bat 'npm install'
                }
            }
        }

        stage('Test First') {
            steps {
                dir('C:\\Users\\Ashish15046\\ParabankPlaywright') {
                    bat 'npm run testFirst'
                }
            }
        }

        stage('Regression') {
            steps {
                dir('C:\\Users\\Ashish15046\\ParabankPlaywright') {
                    bat 'npm run Regression'
                }
            }
        }

        stage('API Tests') {
            steps {
                dir('C:\\Users\\Ashish15046\\ParabankPlaywright') {
                    bat 'npm run testAPI'
                }
            }
        }

        stage('Generate Allure Report') {
            steps {
                dir('C:\\Users\\Ashish15046\\ParabankPlaywright') {
                    bat 'npm run alluregenerate'
                }
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'C:\\Users\\Ashish15046\\ParabankPlaywright\\allure-report\\**',
                             allowEmptyArchive: true
        }
    }
}
