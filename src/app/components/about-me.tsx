'use client';
import { RoughNotation } from 'react-rough-notation';

export function AboutMe() {
    'use client';

    return (
        <div className="pt-6">
            <h1 className="pb-6 text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
                Hi, I am{' '}
                <span className="text-primary-color-500 dark:text-primary-color-dark-500">Joseph</span>
            </h1>
            <p className="pt-5 text-lg text-gray-600 dark:text-gray-300">
                An aspiring computer scientist who is passionate about immersive technologies, such as Virtual and Mixed Realities (VR/MR).
                I have a diverse set of skills ranging from web development using React to virtual reality and mixed reality application development using Unity and C#.
            </p>
            <p className="pt-10 text-lg leading-7 text-slate-600 dark:text-slate-300">
                A blend of{' '}
                <RoughNotation
                    animate={true}
                    type="box"
                    show={true}
                    color="#DE1D8D"
                    animationDelay={1000}
                    animationDuration={2500}
                >
                    <span className={"hover:text-blue-400"}>caffeine, cats, and contemplation</span> &nbsp;
                </RoughNotation>
                - welcome to my digital playground for thoughts and ideas. {' '}
            </p>
        </div>
    )
}