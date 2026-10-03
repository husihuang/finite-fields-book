"""GF(2^m) 的位编码运算。
bit i 是 x^i 的系数；modulus 包含首项，例如 x^4+x+1 = 0b10011。
只使用 Python 标准库；这是教学实现，不针对大规模计算做优化。
"""
def poly_rem(a, b):
    if b == 0:
        raise ZeroDivisionError('零多项式不能作为除式')
    while a and a.bit_length() >= b.bit_length():
        a ^= b << (a.bit_length() - b.bit_length())
    return a


def irreducible(f):
    m = f.bit_length() - 1
    if m < 1:
        return False
    # 可约 m 次多项式必有次数不超过 m//2 的首 1 因子。
    for d in range(1, m // 2 + 1):
        for g in range(1 << d, 1 << (d + 1)):
            if poly_rem(f, g) == 0:
                return False
    return True


class GF2m:
    def __init__(self, modulus):
        if not isinstance(modulus, int) or not irreducible(modulus):
            raise ValueError('modulus 必须是 F2 上的不可约多项式位编码')
        self.modulus = modulus
        self.m = modulus.bit_length() - 1
        self.q = 1 << self.m

    def check(self, a):
        if not isinstance(a, int) or not 0 <= a < self.q:
            raise ValueError(f'元素编码应在 0 到 {self.q-1} 之间')

    def add(self, a, b):
        self.check(a); self.check(b)
        return a ^ b

    def mul(self, a, b):
        self.check(a); self.check(b)
        out = 0
        while b:
            if b & 1:
                out ^= a
            b >>= 1
            a <<= 1
            if a & self.q:
                a ^= self.modulus
        return out

    def power(self, a, n):
        self.check(a)
        if not isinstance(n, int):
            raise ValueError('指数必须是整数')
        if n < 0:
            return self.power(self.inv(a), -n)
        out = 1
        while n:
            if n & 1:
                out = self.mul(out, a)
            a = self.mul(a, a)
            n >>= 1
        return out

    def inv(self, a):
        self.check(a)
        if a == 0:
            raise ZeroDivisionError('0 没有乘法逆元')
        return self.power(a, self.q - 2)

    def div(self, a, b):
        return self.mul(a, self.inv(b))

    def order(self, a):
        self.check(a)
        if a == 0:
            raise ValueError('0 不属于乘法群')
        t = 1
        for k in range(1, self.q):
            t = self.mul(t, a)
            if t == 1:
                return k
        raise AssertionError('不可约模多项式应给出有限域')

    def trace(self, a):
        self.check(a)
        out, t = 0, a
        for _ in range(self.m):
            out ^= t
            t = self.mul(t, t)
        return out

    def norm(self, a):
        return self.power(a, self.q - 1)

    def log_tables(self, generator=2):
        if self.order(generator) != self.q - 1:
            raise ValueError('查表生成元必须是本原元')
        exp, log, a = [], {}, 1
        for k in range(self.q - 1):
            exp.append(a); log[a] = k
            a = self.mul(a, generator)
        return exp, log

    def mul_log(self, a, b, generator=2):
        self.check(a); self.check(b)
        if a == 0 or b == 0:
            return 0
        exp, log = self.log_tables(generator)
        return exp[(log[a] + log[b]) % (self.q - 1)]

    def div_log(self, a, b, generator=2):
        self.check(a); self.check(b)
        if b == 0:
            raise ZeroDivisionError('不能除以零')
        if a == 0:
            return 0
        exp, log = self.log_tables(generator)
        return exp[(log[a] - log[b]) % (self.q - 1)]
