pipeline {
    agent any
    stages {
        stage("build"){
            steps {
                echo 'Building App...'
                nodejs('Node-11') {
                    sh 'yarn build'
                }
            }
        }
        stage("test"){
            steps {
                echo 'Testing...'
                nodejs('Node-11'){
                    sh 'yarn test'
                 }
            }
        }
    }
}
