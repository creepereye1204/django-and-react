# 도움말

```bash
항상 nginx 파일 수정하면 재시작 꼮꼭꼮 하기!! 
안하면 적용안됨!!!!!!!!
지금까지 https랑 wss 설정도 이것떄문에 고생한거
특히 smallab 같은 서버에서 이미실행중인경우(도커에서실행하지 않았을경우 sudo /etc/init.d/nginx stop
으로 종료하고 사용하세요!
또한 이렇게해도 오류가나는 경우는 nginx -t 로 오류를 확인하세요 보통 설정파일이 잘못된경우가 많음)

```


## uwsgi 키는법

```bash
poetry run uwsgi --ini core_uwsgi.ini
```

## nginx 키는법

```bash
/etc/init.d/nginx restart
```

## pyenv 설치법

```bash
git clone https://github.com/pyenv/pyenv.git ~/.pyenv
```

```bash
vim /.bashrc
```

```bash
# 맨 아래에 추가
echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.bashrc
echo 'command -v pyenv >/dev/null || export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.bashrc
echo 'eval "$(pyenv init -)"' >> ~/.bashrc
```

```bash
# 저장하고 적용
source /.bashrc
```


