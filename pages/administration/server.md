# Как создать и настроить сервер на Ubuntu

## Создать сервер в облаке

## Настроить доступ ssh по ключу

Для безоспасности лучше настроить вход ssh по ключам. 

На локальной машине выполяем:

1. `ssh-keygen -t ecdsa` (если еще нет ключа)
2. `ssh-copy-id <ip или имя сервера>` (копируем ключ на сервер)
3. `ssh <ip или имя сервера>` (поверяем вход по ключу)

На удаленной машине запрещаем вход по паролю:

```
sudo tee /etc/ssh/sshd_config.d/disable_root_login.conf << EOF
ChallengeResponseAuthentication no
PasswordAuthentication no
UsePAM no
PermitRootLogin no
EOF

sudo systemctl restart ssh
```
