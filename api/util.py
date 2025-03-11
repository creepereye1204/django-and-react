import hashlib


def convert_to_sha256(input_string):
    SALT = "2c(&#%$@!!{@$}}})"

    # 입력 문자열과 솔트를 결합하여 해시 생성
    sha256_hash = hashlib.sha256((SALT + input_string).encode("utf-8"))

    # 해시값을 16진수 문자열로 반환
    return sha256_hash.hexdigest()



