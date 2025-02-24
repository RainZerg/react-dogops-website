import React, {useRef} from 'react';
import {Button, Card, CardBody, CardFooter, CardHeader} from "@nextui-org/react";


const About = () => {
  return (
    <div className="relative my-48 md:my-32 h-1/3">

      <img src="https://placehold.co/1600x400" alt="about" className="relative w-full h-full object-cover" />
      <div className="absolute top-1/2 right-10 transform -translate-y-1/2 w-full max-w-sm">
        <Card isBlurred className='border-none bh-background/60 dark:bg-default-100/50 max-w-[610px] max-h-[400px]' shadow="sm">
          <CardHeader><h2 className='text-4xl font-bold'>О нас</h2></CardHeader>
          <CardBody><p className='p-4 overflow-hidden'>Наша цель - сделать вашу жизнь лучше. Мы предлагаем широкий ассортимент товаров для животных, а также услуги по уходу за ними. Наши специалисты помогут вам подобрать все необходимое для вашего питомца. Мы работаем с лучшими поставщиками, чтобы предложить вам только качественные товары. Мы всегда рады видеть вас в нашем магазине!
          </p>
          </CardBody>
          <CardFooter><Button size="lg" color="primary" variant="ghost">Подробнее</Button></CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default About;

