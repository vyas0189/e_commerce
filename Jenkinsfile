pipeline {
    agent any

    stages {
        stage("build"){
            steps {
                echo 'Building...'
                sh 'CI=false npm run build'
            }
        }
        stage("test"){
            steps {
                echo 'Testing...'
                sh 'npm run test'
            }
        }
    }
}
