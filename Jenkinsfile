pipeline {
    agent any

    stages {
        stage("build"){
            steps {
                echo 'Building...'
                sh 'CI=false yarn build'
            }
        }
        stage("test"){
            steps {
                echo 'Testing...'
                sh 'yarn test'
            }
        }
    }
}
