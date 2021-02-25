FROM python:3
ENV PYTHONUNBUFFERED 1

RUN mkdir /dog_adoption
WORKDIR /dog_adoption

COPY requirements.txt ./
RUN python3 -m pip install --upgrade pip setuptools
RUN pip install -r requirements.txt

COPY . /dog_adoption

RUN chmod -R 755 staticfiles
RUN chown -R root staticfiles

EXPOSE 8000