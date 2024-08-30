import instance from "../Config/Prisma.js";

class UserRepository {
  async createUser(user) {
    return await instance.getClient().user.create({
      data: user.toObject(),
    });
  }

  async getUserByEmail(email) {
    return await instance.getClient().user.findUnique({
      where: {
        email: email,
      },
    });
  }

  async getUserById(id) {
    return await instance.getClient().user.findUnique({
      where: {
        id: parseInt(id),
      },
    });
  }

  async updateUser(id, user) {
    return await instance.getClient().user.update({
      where: {
        id: parseInt(id),
      },
      data: user.toObject(),
    });
  }

  async deleteUser(id) {
    return await instance.getClient().user.delete({
      where: {
        id: parseInt(id),
      },
    });
  }

  async saveVerificationCode(userId, verificationCode) {
    return await instance.getClient().user.update({
      where: {
        id: parseInt(userId),
      },
      data: {
        verification_code: verificationCode,
      },
    });
  }

  async verifyEmail(userId) {
    return await instance.getClient().user.update({
      where: {
        id: parseInt(userId),
      },
      data: {
        emailVerified: true,
      },
    });
  }

  async saveResetPasswordToken(userId, resetToken, expireIn) {
    return await instance.getClient().resetPasswordToken.create({
      data: {
        userId: parseInt(userId),
        token: resetToken,
        expiresAt: expireIn,
      },
    });
  }
  async getUserResetToken(userId) {
    return await instance.getClient().resetPasswordToken.findFirst({
      where: {
        userId: parseInt(userId),
        expiresAt: {
          gte: new Date(),
        },
      },
    });
  }

  async updatePasswordUser(userId, newPassword) {
    return await instance.getClient().user.update({
      where: {
        id: parseInt(userId),
      },
      data: {
        password: newPassword,
      },
    });
  }

  async deleteResetPasswordToken(resetTokenId) {
    return await instance.getClient().resetPasswordToken.delete({
      where: {
        id: parseInt(resetTokenId),
      },
    });
  }

  async getDatasUsers () {
    return await instance.getClient().user.findMany();
  }
}

export default UserRepository;
