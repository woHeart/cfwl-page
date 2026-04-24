from passlib.context import CryptContext

# 配置密码上下文
pwd_context = CryptContext(
    schemes=["argon2", "bcrypt"],  # 最新推荐的算法优先级
    argon2__memory_cost=65536,  # 内存消耗64MB（OWASP推荐）
    argon2__time_cost=3,  # 迭代次数
    argon2__parallelism=1,  # 并行度
    bcrypt__rounds=12,  # BCrypt降级方案的工作因子
)


# 生成哈希密码
def hash_password(password):
    return pwd_context.hash(password)


# 验证哈希密码
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)
