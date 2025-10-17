"use client"

import React from "react"
import { useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

const STORAGE_KEY = "giftedhub:seen_notice_v1"

export default function NoticePopup() {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    try {
      const seen = localStorage.getItem(STORAGE_KEY)
      if (!seen) {
        setOpen(true)
      }
    } catch (e) {
      // ignore localStorage errors
      setOpen(true)
    }
  }, [])

  function closeAndRemember() {
    try {
      localStorage.setItem(STORAGE_KEY, "1")
    } catch (e) {
      // noop
    }
    setOpen(false)
  }

  // don't render anything during SSR
  if (!mounted) return null

  return (
    <Dialog open={open} onOpenChange={(val) => !val && closeAndRemember()}>
      {/* trigger is not used — we open programmatically */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Notice</DialogTitle>
          <DialogDescription>
            This website is for project purposes and is not related to any real
            business. No transactions should be performed here. The site was
            created by the following members:
            <ul className="mt-2 list-disc pl-6 text-sm text-muted-foreground">
              <li>23BCR00392 – Akriti</li>
              <li>23BCR00396 – Amit</li>
              <li>23BCR00443 – Daewaj</li>
              <li>23BCR00633 – Ritika</li>
              <li>23BCR00676 – Shriya</li>
            </ul>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="default" onClick={closeAndRemember}>
            I understand
          </Button>
          <DialogClose asChild>
            <Button variant="ghost">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
