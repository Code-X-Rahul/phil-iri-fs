import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function deleteAllData() {
    try {
        // Delete in reverse order of dependencies
        console.log('Starting to delete all data...')

        // First, delete tables with foreign keys
        await prisma.score.deleteMany({})
        console.log('✓ Deleted all scores')

        await prisma.question.deleteMany({})
        console.log('✓ Deleted all questions')

        await prisma.test.deleteMany({})
        console.log('✓ Deleted all tests')

        await prisma.material.deleteMany({})
        console.log('✓ Deleted all materials')

        // Delete profile tables
        // await prisma.studentProfile.deleteMany({})
        console.log('✓ Deleted all student profiles')

        // await prisma.teacherProfile.deleteMany({})
        console.log('✓ Deleted all teacher profiles')

        // Finally, delete main tables
        await prisma.student.deleteMany({})
        console.log('✓ Deleted all students')

        await prisma.teacher.deleteMany({})
        console.log('✓ Deleted all teachers')

        console.log('Successfully deleted all data!')
    } catch (error) {
        console.error('Error while deleting data:', error)
    } finally {
        await prisma.$disconnect()
    }
}

// Execute the function
deleteAllData()