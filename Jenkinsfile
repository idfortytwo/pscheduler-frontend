pipeline {
    agent any

    triggers {
        githubPush()
    }

    stages {
        stage('Prepare') {
            steps {
                deleteDir()
                git 'https://github.com/idfortytwo/pscheduler-frontend.git'
            }
        }

        stage('Build') {
            steps {
                sh 'npm install'
                sh 'npm run ng build'
            }
        }

        stage('Archive') {
            steps {
                sh 'zip static.zip -j dist/angular/*'
            }

            post {
                success {
                    archiveArtifacts 'static.zip'
                }
            }
        }
    }
}
