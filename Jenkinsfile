pipeline {
    agent any
    stages {
        stage("build"){
            steps {
                echo 'Building App...'
                nodejs('Node-12.16') {
                    sh 'yarn'
                }
            }
        }
        stage("test"){
            steps {
                echo 'Testing...'
                nodejs('Node-12.16'){
                    sh 'yarn test'
                 }
            }
        }
    }
}
 