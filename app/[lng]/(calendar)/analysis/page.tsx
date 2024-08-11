"use client";

import { useTranslation } from '@/app/lib/i18n/client';

import React, { useState } from 'react';

export default function Index({ params: { lng }} : any) {
    const { t } = useTranslation(lng, 'main');
    return (<>
       Coming soon
    </>
    );
}