#!/bin/bash
# 设置开发环境的脚本

export project_dir="`pwd`/"

docker-compose restart app
