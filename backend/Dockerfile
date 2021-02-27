FROM python:3
ENV PYTHONUNBUFFERED 1

RUN mkdir /dog_adoption
WORKDIR /dog_adoption

COPY requirements.txt ./
RUN pip install -r requirements.txt
COPY . /dog_adoption/
